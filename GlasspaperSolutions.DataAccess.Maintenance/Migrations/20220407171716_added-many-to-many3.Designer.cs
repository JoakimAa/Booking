﻿// <auto-generated />
using System;
using GlasspaperSolutions.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GlasspaperSolutions.DataAccess.Maintenance.Migrations
{
    [DbContext(typeof(BookingContext))]
    [Migration("20220407171716_added-many-to-many3")]
    partial class addedmanytomany3
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("GlasspaperSolutions.Model.AvailableResource", b =>
                {
                    b.Property<int>("BookingId")
                        .HasColumnType("int");

                    b.Property<int>("ResourceId")
                        .HasColumnType("int");

                    b.HasKey("BookingId", "ResourceId");

                    b.HasIndex("ResourceId");

                    b.ToTable("AvailableResource");
                });

            modelBuilder.Entity("GlasspaperSolutions.Model.Booking", b =>
                {
                    b.Property<int>("BookingId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BookingId"), 1L, 1);

                    b.Property<DateTime?>("EndTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Lender")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Owner")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("StartTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("BookingId");

                    b.ToTable("Bookings");
                });

            modelBuilder.Entity("GlasspaperSolutions.Model.BookingResource", b =>
                {
                    b.Property<int>("BookingId")
                        .HasColumnType("int");

                    b.Property<int>("ResourceId")
                        .HasColumnType("int");

                    b.HasKey("BookingId", "ResourceId");

                    b.HasIndex("ResourceId");

                    b.ToTable("BookingResource");
                });

            modelBuilder.Entity("GlasspaperSolutions.Model.Resource", b =>
                {
                    b.Property<int>("ResourceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ResourceId"), 1L, 1);

                    b.Property<string>("Category")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ResourceId");

                    b.ToTable("Resources");
                });

            modelBuilder.Entity("GlasspaperSolutions.Model.AvailableResource", b =>
                {
                    b.HasOne("GlasspaperSolutions.Model.Booking", "Booking")
                        .WithMany("AvailableResources")
                        .HasForeignKey("BookingId")
                        .IsRequired()
                        .HasConstraintName("FK_AvailableResources_Booking");

                    b.HasOne("GlasspaperSolutions.Model.Resource", "Resource")
                        .WithMany()
                        .HasForeignKey("ResourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Booking");

                    b.Navigation("Resource");
                });

            modelBuilder.Entity("GlasspaperSolutions.Model.BookingResource", b =>
                {
                    b.HasOne("GlasspaperSolutions.Model.Booking", "Booking")
                        .WithMany("Resources")
                        .HasForeignKey("BookingId")
                        .IsRequired()
                        .HasConstraintName("FK_BookingResource_Booking");

                    b.HasOne("GlasspaperSolutions.Model.Resource", "Resource")
                        .WithMany("Bookings")
                        .HasForeignKey("ResourceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_BookingResource_Resource");

                    b.Navigation("Booking");

                    b.Navigation("Resource");
                });

            modelBuilder.Entity("GlasspaperSolutions.Model.Booking", b =>
                {
                    b.Navigation("AvailableResources");

                    b.Navigation("Resources");
                });

            modelBuilder.Entity("GlasspaperSolutions.Model.Resource", b =>
                {
                    b.Navigation("Bookings");
                });
#pragma warning restore 612, 618
        }
    }
}
